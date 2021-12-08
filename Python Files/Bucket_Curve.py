import turtle             
pen = turtle.Turtle()

def draw_bucket(length, angle):
    pen.rt(angle)
    pen.fd(length)
    pen.lt(angle)
    pen.fd(length) 
    pen.lt(angle)
    pen.fd(length)
    pen.rt(angle)

#draw_bucket(100, -90)
#draw_bucket(100, 90)
def draw_bucket_curve(n, length, tempLength, tempN, angle):
    if n == 1:
        draw_bucket(length, angle)
    else:
        pen.rt(angle)
        draw_bucket_curve(n-1,length/4, tempLength, tempN, -angle)
        pen.fd(tempLength/(pow(4, tempN - 1)))
        pen.lt(angle)
        draw_bucket_curve(n-1,length/4, tempLength, tempN, angle)
        pen.fd(tempLength/(pow(4, tempN - 1)))
        draw_bucket_curve(n-1,length/4, tempLength, tempN, angle)
        pen.lt(angle)
        pen.fd(tempLength/(pow(4, tempN - 1)))
        draw_bucket_curve(n-1,length/4, tempLength, tempN, -angle)
        pen.rt(angle)

draw_bucket_curve(4, 1000, 1000 , 4, 90)
