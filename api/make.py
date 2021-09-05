import buttonsheet
from flask import Flask, request
from PIL import Image
import urllib.parse

app = Flask("sheetmaker")

@app.route("/", methods=["POST"])
def make():
    f = request.files['image']
    im = Image.open(f)
    pdf = buttonsheet.make(im)
    part = f.filename.rpartition(".")
    fname = (part[0] or part[2]) + ".pdf"
    return pdf.output(), {
        "Content-Type": "application/pdf",
        "Content-Disposition": f"attachment; filename*={rfc5987(fname)}"
    }

def rfc5987(s):
    return "UTF-8''" + urllib.parse.quote(s, encoding="utf-8")
