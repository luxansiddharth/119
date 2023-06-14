function setup() {
canvas=createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas); 
synth = window.speechSynthesis;

}


function preload()
{
 classifer=ml5.imageClassifier('DoodleNet')
}


 
function clearCanvas() {
    background("white");
}




function draw()
{
    strokeWeight(20);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}



function classifyCanvas() {

    classifer.classify(canvas,gotResult);
}


function gotResult(error,results) {
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='Label : ' + results[0].label;

    document.getElementById('Confidence').innerHTML='Confidence : ' +Math.round(results[0].confidence*100)+ '%';


    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

