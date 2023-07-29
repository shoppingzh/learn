import os


def __file_name_sort(name):
    return int(name.split('.')[0])


def merge(dir, out):
    filenames = os.listdir(dir)
    filenames.sort(key=__file_name_sort)
    with open(out, mode='w') as f:
        for filename in filenames:
            with open(os.path.join(dir, filename), mode='r') as sf:
                f.write(sf.read())





