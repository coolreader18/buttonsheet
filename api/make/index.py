from typing import Tuple
from . import buttonsheet
from flask import Flask, request
from PIL import Image, ImageDraw
import urllib.parse
import itertools
from werkzeug.exceptions import BadRequest
from functools import lru_cache

app = Flask("sheetmaker")

@lru_cache(20)
def mask(size: Tuple[int, int]) -> Tuple[Image.Image, Image.Image]:
    blank = Image.new("RGBA", size, (255, 255, 255, 0))
    circle_mask = blank.copy()
    ImageDraw.Draw(circle_mask).pieslice([(0, 0), size], 0, 360, (255, 255, 255, 255))
    return blank, circle_mask

def open_image(buf):
    try:
        im: Image.Image = Image.open(buf)
    except (Image.UnidentifiedImageError, Image.DecompressionBombError):
        raise BadRequest("bad image")
    im = im.convert("RGBA")
    blank, circle_mask = mask(im.size)
    return Image.composite(im, blank, circle_mask)


def extract_rows():
    markers = iter(request.form.getlist("marker"))
    layers = zip(
        map(open_image, request.files.getlist("layer-image")),
        map(bool, request.form.getlist("layer-full")),
    )
    while True:
        row = list(extract_layers(markers, layers))
        if row:
            yield row
        else:
            break


def extract_layers(markers, layers):
    for marker in markers:
        if marker == "endrow":
            break
        yield next(layers)


@app.route("/<path:path>", methods=["POST"])
def make(path):
    fname = request.form["button-name"] + ".pdf"
    pdf = buttonsheet.make(extract_rows())
    return pdf.output(), {
        "Content-Type": "application/pdf",
        "Content-Disposition": f"attachment; filename*={rfc5987(fname)}",
    }


def rfc5987(s):
    return "UTF-8''" + urllib.parse.quote(s, encoding="utf-8")
