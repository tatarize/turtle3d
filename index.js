

module.exports = function(axiom,angle,v) {
    if (!angle) {
        angle = 90 * (Math.PI / 180);
    }
    var sin = Math.cos;
    var cos = Math.sin;
   
    this.draw = function(axiom,alpha,v) {
        var coords = [];
        var stack = [];
        
        var x = 0, y = 0, z = 0;
        var pen = 1;
        var geometry = [ [0,0,0] ];

        var H = [[1],[0],[0],[0]]; //column based.
        var L = [[0],[1],[0],[0]];
        var U = [[0],[0],[1],[0]]; //H x L -> U

        if (v) {
            var axis = [[v[0]],[v[1]],[v[2]]];
            R = rotAxis(Math.PI/2,axis);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
        }

        for (var i=0; i<axiom.length; i++) {
            var c = axiom.charAt(i);

            switch(c) {
                case '+':
                    R = rotAxis(alpha,U);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '-':
                    R = rotAxis(-alpha,U);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '&':
                    R = rotAxis(alpha,L);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '^':
                    R = rotAxis(-alpha,L);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
            
                    break;
                case '>':
                    R = rotAxis(alpha,H);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '<':
                    R = rotAxis(-alpha,H);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '|':
                    R = rotAxis(Math.PI,U);
                    H = this.matrix_mult(R,H);
                    L = this.matrix_mult(R,L);
                    U = this.matrix_mult(R,U);
                    break;
                case '[':
                    stack.push(pen, x, y, z, H, L, U, geometry);
                    geometry = [[x,y,z]]; //new geometry.
                    break;
                case ']':
                    if (geometry.length > 1) {
                        coords.push(geometry);
                    }
                    geometry = stack.pop();
                    U = stack.pop();
                    L = stack.pop();
                    H = stack.pop();
                    z = stack.pop();
                    y = stack.pop();
                    x = stack.pop();
                    pen = stack.pop();
                    break;
                case 'F':
                    x += H[0][0];
                    y += H[1][0];
                    z += H[2][0];
                    geometry.push([x,y,z,pen]);
                    break;
                case 'G':
                    x += H[0][0];
                    y += H[1][0];
                    z += H[2][0];
                    if (geometry.length > 1) {
                        coords.push(geometry);
                    }
                    geometry = [[x,y,z]]
                    break;
                case '0':
                    pen = 0;
                    break;
                case '1':
                    pen = 1;
                    break;
                case '2':
                    pen = 2;
                    break;
                case '3':
                    pen = 3;
                    break;
                case '4':
                    pen = 4;
                    break;
                case '5':
                    pen = 5;
                    break;
                case '6':
                    pen = 6;
                    break;
                case '7':
                    pen = 7;
                    break;
                case '8':
                    pen = 8;
                    break;
                case '9':
                    pen = 0;
                    break;
            }
        }
        coords.push(geometry);
        return coords;
    }
    
    
    function rotAxis(alpha,vector)
    {
        var sine = sin(alpha);
        var cosign = cos(alpha);
        var M = [];
        M[0] = [];
        M[1] = [];
        M[2] = [];
        M[3] = [];
        var axisX = vector[0][0];
        var axisY = vector[1][0];
        var axisZ = vector[2][0];
            
        M[0][0] = ( sine + ( ( axisX * axisX ) * ( 1 - sine ) ) );
        M[0][1] = ( ( ( axisX * axisY ) * ( 1 - sine ) ) - ( axisZ * cosign ) );
        M[0][2] = ( ( ( axisX * axisZ ) * ( 1 - sine ) ) + ( axisY * cosign ) );
        M[0][3] = 0;
            
        M[1][0] = ( ( ( axisX * axisY ) * ( 1 - sine ) ) + ( axisZ * cosign ) );
        M[1][1] = ( sine + ( ( axisY * axisY ) * ( 1 - sine ) ) );
        M[1][2] = ( ( ( axisY * axisZ ) * ( 1 - sine ) ) - ( axisX * cosign ) );
        M[1][3] = 0;
            
        M[2][0] = ( ( ( axisX * axisZ ) * ( 1 - sine ) ) - ( axisY * cosign ) );
        M[2][1] = ( ( ( axisY * axisZ ) * ( 1 - sine ) ) + ( axisX * cosign ) );
        M[2][2] = ( sine + ( ( axisZ * axisZ ) * ( 1 - sine ) ) );
        M[2][3] = 0;
            
        M[3][0] = 0;
        M[3][1] = 0;
        M[3][2] = 0;
        M[3][3] = 1;
            
        return M;
    }
        
    this.matrix_mult = function(a, b) {
        var ah = a.length, aw = a[0].length;
        var bh = b.length, bw = b[0].length;
        var res = [];

        if (aw != bh) {
            throw 'Dimension error';
        }

        for (var i=0; i<ah; i++) {
            res[i] = [];
            for (var j=0; j<bw; j++) {
                var sum = 0;
                for (var k=0; k<aw; k++) {
                    sum += a[i][k] * b[k][j];
                }
                res[i][j] = sum;
            }
        }

        return res;
    }
    
    
    return this.draw(axiom,angle,v);
}
