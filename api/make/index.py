from . import buttonsheet
from flask import Flask, request
from PIL import Image
import urllib.parse
import itertools
from werkzeug.exceptions import BadRequest

app = Flask("sheetmaker")


def open_image(buf):
    try:
        return Image.open(buf)
    except (Image.UnidentifiedImageError, Image.DecompressionBombError):
        raise BadRequest("bad image")


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
    fname = request.files["layer-image"].filename
    rows = list(extract_rows())
    import pprint
    pprint.pprint(rows)
    pdf = buttonsheet.make(rows)
    part = fname.rpartition(".")
    fname = (part[0] or part[2]) + ".pdf"
    return pdf.output(), {
        "Content-Type": "application/pdf",
        "Content-Disposition": f"attachment; filename*={rfc5987(fname)}",
    }


def rfc5987(s):
    return "UTF-8''" + urllib.parse.quote(s, encoding="utf-8")
