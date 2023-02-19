let optscreen=document.getElementById("output")
var syn=0;
var cal=0;
var op=0
function displayno(num)
{
    if(cal==1 && op==0){
        cal=0;
        Clear();
    }
    if(syn==1){
        syn=0;
        Clear();
    }
        optscreen.value+=num
}
function displayOp(num)
{
    if(syn==1){
        syn=0;
        Clear();
    }
        op=1;
        optscreen.value+=num
}
function Calculate()
{
    try{
        optscreen.value=eval(optscreen.value)
        cal=1;
        op=0;
    }
    catch{
        optscreen.value="Syntax Error"
        syn=1
    }
}
function Clear()
{
    optscreen.value="";
}
function del()
{
    optscreen.value=optscreen.value.slice(0,-1);
}