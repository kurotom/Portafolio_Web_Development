import subprocess
import re

class ScanViruses(object):
    def __init__(self, filePath):
        self.file = filePath

    def scan(self):
        infected = 0
        if type(self.file) == str:
            proceso = subprocess.run(["clamscan", "--scan-pdf=yes", '--infected', '--remove=yes', self.file], capture_output=True)
            result = re.findall(r'(Infected files:).(\d+)', proceso.stdout.decode('utf-8'))
            if int(result[0][1]) > 0:
                # print('Infected', item, result)
                return 1
            else:
                return 0

        elif type(self.file) == list:
            for item in self.file:
                proceso = subprocess.run(["clamscan", "--scan-pdf=yes", '--infected', '--remove=yes', item], capture_output=True)
                result = re.findall(r'(Infected files:).(\d+)', proceso.stdout.decode('utf-8'))
                if int(result[0][1]) > 0:
                    # print('Infected', item, result)
                    return 1
                else:
                    return 0
