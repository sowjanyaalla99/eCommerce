data1 =[
    {
     "id":"1",
     "name":"sowji"   
    },
    {
        "id":"1",
        "name":"naveen"   
       },
       {
        "id":"2",
        "name":"madhu"   
       },
       {
        "id":"2",
        "name":"santhosh"   
       },
       {
        "id":"3",
        "name":"swathi"   
       },
       {
        "id":"4",
        "name":"deepthi"   
       },
       {
        "id":"5",
        "name":"jyosthna"   
       },
       {
        "id":"5",
        "name":"prasanna"   
       },
       {
        "id":"5",
        "name":"siri"   
       },
       {
        "id":"6",
        "name":"krishna"   
       },
       {
        "id":"6",
        "name":"sowji"   
       },
       {
        "id":"7",
        "name":"kiran"   
       },
       {
        "id":"8",
        "name":"stark"   
       },
       {
        "id":"9",
        "name":"vanitha"   
       },
       {
        "id":"10",
        "name":"siva"   
       },
       {
        "id":"11",
        "name":"bindu"   
       }, {
        "id":"11",
        "name":"aishu"   
       },
       {
        "id":"12",
        "name":"john"   
       },
       {
        "id":"13",
        "name":"vinod"   
       }, {
        "id":"13",
        "name":"hema"   
       }, {
        "id":"14",
        "name":"keerthi"   
       },
       {
        "id":"15",
        "name":"bujji"   
       },
      {
        "id":"16",
        "name":"triveni"   
       },
       {
        "id":"17",
        "name":"daamu"   
       },
       {
        "id":"18",
        "name":"prasad"   
       },
       {
        "id":"19",
        "name":"pavan"   
       },
       {
        "id":"20",
        "name":"bujji"   
       },

       {
        "id":"21",
        "name":"amritha"   
       },

       {
        "id":"22",
        "name":"teju"   
       },

       {
        "id":"23",
        "name":"rama"   
       },

       {
        "id":"24",
        "name":"lavanya"   
       },

       {
        "id":"23",
        "name":"bujji"   
       },
       {
        "id":"23",
        "name":"pandu"   
       },
       {
           "id":"24",
           "name":"harshi"
       }

]
var data2=[4,5,1]
 var data3=[]

 for(var i=0;i=data1.length-1;i++){
     for(var j=0;j=data2.length;j++){
         if(data1[i].id === data2[i]){
             data3.push(data[i].name);
             console.log(data3);
         }
     }
 }
// var data2=data.map((result)=>{
//     //console.log(result.data[i].id)
//     console.log(result)
// //if(data1[i].id === data2[i]){
//data3.push(data[i].name)
//}
// })


