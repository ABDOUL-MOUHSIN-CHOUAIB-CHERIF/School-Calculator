//calculator programm

const display = document.getElementById("display");

function appendtodisplay(input){
   display.value += input;
}
function cleardisplay(input){
    display.value = " " ;
}
function calculate(input){
    try{
        display.value = eval(display.value)
      }
  catch(error){
    display.value = " Syntax Error";
  }
}