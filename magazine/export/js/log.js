function logPage() 
{
   var w = window.innerWidth;
   var h = window.innerHeight;

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() 
   {
       if(this.readyState == 4 && this.status == 200) 
       {
       }
   };

   xhttp.open("GET", "https://dirkjanbuter.com/magazine/app/log.php?w="+w+"h="+h+"t=" + Math.random(), true);
   xhttp.send();
}
window.addEventListener('load', logPage);
