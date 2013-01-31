Turtle 3D
========

In Turtle Graphics, rather than a coordinate system we have a pen which follows a set of rules without any regard to it's current position or orientation.

Forward, turn right, forward, turn left, about face, forward.


Usage
        var turtle = require('turtle3d');
        var coords = turtle("^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->", 90 * (Math.PI / 180));

Typically there is a strong connection between using lsystem rules and turtle graphics in either 2 or 3 dimensions.

        var fractal = require('lsys');
        var lsystem = fractal("L", {
            "L": "L+R++R-L--LL-R+", 
            "R": "-L+RR++R+L--L-R"
        }).iterate(2).apply({"L": "F","R": "F"}); 
        
        lsystem.debug();
        var turtle = require('turtle3d');
        var coords = turtle(lsystem.string(), 60 * (Math.PI / 180));
        
Uses an LSystem to build and then Turtle to apply the rules for a Gosper Flowsnake with two iterations, a two dimensional spacefilling fractal.

Syntax
        
        F: draw and move one unit vector forward
        +: turn right
        -: turn left
        &: pitch up
        ^: pitch down
        <: roll right
        >: roll left
        |: reverse vector direction
        [: push current pen position
        ]: pop current position

More
