def find_7_sum(m, d=7):
    s = 0
    for x in range(m):
        n = x + 1
        if n % d == 0:
            s += n
    return s


print(find_7_sum(1000, 8))
