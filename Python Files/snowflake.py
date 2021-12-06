import turtle             
pen = turtle.Turtle()  #Create a pen cursor object

#L system for is is F+F--F+F
#F is draw forward, + is turn left 60 degrees, - turns right 60 degrees 
def snowflake_test(n, length):
    if n == 0:
        pen.fd(length)
    else:
        snowflake_test(n-1, length/3)
        #Rotate counter clock wise 
        pen.lt(60)
        snowflake_test(n-1, length/3)
        #Rotate clock wise
        pen.rt(120)
        snowflake_test(n-1, length/3)
        #Rotate counter clock wise
        pen.lt(60)
        snowflake_test(n-1, length/3)

#Create snowflake only creates one side, I need to rotate the drawing cursor to draw the other 3 sides. 
snowflake_test(3,300)
pen.rt(120)
snowflake_test(3,300)
pen.rt(120)
snowflake_test(3,300)