
function getSrc(id){
  switch(id){
    case 'city':
      return "https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg";
    case 'cubes':
      return "https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg";
    case 'sechelt':
      return "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg";
  }
}

function addImg(id){
    console.log("addImg.js");
    idNoHash = id.replace("#","");
    if(document.querySelector(id)==null){
        var imgEl = document.createElement("img");
        
        var loadedAttr = document.createAttribute("loaded");
        loadedAttr.value = "false";
        imgEl.setAttributeNode(loadedAttr);

        imgEl.addEventListener('load', function(){
            console.log("img loaded");
            imgEl.setAttribute("loaded","true");
        });

        var idAttr = document.createAttribute("id");
        idAttr.value = idNoHash;
        imgEl.setAttributeNode(idAttr);

        var crossoriginAttr = document.createAttribute("crossorigin");
        crossoriginAttr.value = "anonymous";
        imgEl.setAttributeNode(crossoriginAttr);

        var srcAttr = document.createAttribute("src");
        srcAttr.value = getSrc(idNoHash);
        imgEl.setAttributeNode(srcAttr);

        var assets = document.getElementById('assets');
        assets.appendChild(imgEl);
    }else{
        console.log("img already exists");
    }   
}
