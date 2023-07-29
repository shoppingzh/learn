def find_max(a, b, c):
    if a > b and a > c:
        x = a
    else:
        if b > a and b > c:
            x = b
        else:
            x = c
    if x > 100:
        print('Not matched!')
    else:
        return x


print(find_max(100, -3, 20))
print(find_max(-3, 100, 20))
print(find_max(-3, 20, 100))
print(find_max(-3, 20, 200))
