let script = `a = 1 
                b = 2 
                console.log(a+b)`;

let func = new Function(script);
func();
// let func1 = () => {
//     console.log('Hello');
// }
// func1();
