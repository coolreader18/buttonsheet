from typing import Iterable, Tuple
from PIL import Image
from fpdf import FPDF
import itertools

__all__ = ["make"]

inner_button = 1.25
outer_button = 1.625
page_width = 8.5
page_height = 11
ncols = 4
nrows = 5
margin = 0.25
gap = (page_width - (margin * 2 + outer_button * ncols)) / (ncols - 1)

outer_radius = (outer_button / 2) - (inner_button / 2)


def inch_to_ps(*x):
    return tuple(p * 72 for p in x)


def make_poss(n, w, padding, startp):
    p = startp
    for _nrow in range(n):
        yield p
        p += w + padding


def calc_dims(x, y):
    inner_dims = x + outer_radius, y + outer_radius, inner_button, inner_button
    outer_dims = x, y, outer_button, outer_button
    return inner_dims, outer_dims


poss = lambda n: make_poss(n, outer_button, gap, margin)

button_positions = [(x, y, *calc_dims(x, y)) for x in poss(4) for y in poss(5)]


def draw_circle(ps, center, r):
    ps.fp.write(b"%d %d %d 0 360 arc closepath stroke\n" % (*center, r))


# layers[rows[]]
def make(layers: Iterable[Iterable[Tuple[Image.Image, bool]]]) -> FPDF:
    pdf = FPDF(unit="in", format="letter")
    pdf.add_page()
    for layer in layers:
        imgs = itertools.cycle(layer)
        for x, y, inner_dims, outer_dims in button_positions:
            im, full = next(imgs)
            dims = outer_dims if full else inner_dims
            pdf.image(im, *dims)
    for x, y, *_ in button_positions:
        pdf.circle(x, y, outer_button)
    return pdf