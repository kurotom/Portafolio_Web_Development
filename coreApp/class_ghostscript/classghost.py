import ghostscript as gs
import locale

class ConvertGS():
    def __init__(self, filename, out):
        self.file = filename
        self.out = out

    def excecute(self):
        try:
            args = [
            "ps2pdf",
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.5",
            "-dPDFSETTINGS=/ebook",
            "-dNOPAUSE",
            "-dQUIET",
            "-dBATCH",
            f"-sOutputFile={self.out}",
            self.file
            ]

            encoding = locale.getpreferredencoding()
            args = [a.encode(encoding) for a in args]
            gs.Ghostscript(*args)
            return 0
        except Exception as fallo:
            return fallo
