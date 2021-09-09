from PIL import Image
from fpdf import FPDF

__all__ = ["make"]

inner_button = 1.25
outer_button = 1.625
page_width = 8.5
page_height = 11


def inch_to_ps(*x):
    return tuple(p * 72 for p in x)


def make_poss(n, w, padding, startp):
    p = startp
    for nrow in range(n):
        yield p
        p += w + padding


poss = lambda n: make_poss(n, outer_button, 0.5, 0.25)

button_positions = [(x, y) for x in poss(4)
                    for y in poss(5)]


def draw_circle(ps, center, r):
    ps.fp.write(b"%d %d %d 0 360 arc closepath stroke\n" % (*center, r))


avg = lambda *xs: sum(xs) / len(xs)


def make(im: Image) -> FPDF:
    w, h = im.size
    assert w == h, "should be square"
    pdf = FPDF(unit="in", format="letter")
    pdf.add_page()
    outer_radius = (outer_button / 2) - (inner_button / 2)
    for x, y in button_positions:
        pdf.image(im, x + outer_radius, y + outer_radius, inner_button, inner_button)
        pdf.circle(x, y, outer_button)
    return pdf
