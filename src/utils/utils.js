const fourSquare = require('../modelschema/foursquareschema')
const googleplace = require('../modelschema/googleplaceschema')
const pexels = require('../modelschema/pexelsschema')
const yelp = require('../modelschema/yelpschema')

const getJsonArray =(businesses, source)=>{
    console.log("source : "+source);
    for (var i = 0; i < businesses.length; i++){
        businesses[i].dataSource=source
        businesses[i].creationDate=new Date()
        saveToDB(businesses[i],source);
      }
}

async function saveToDB(responseData,source){
    try{
        console.log("source : "+source);
        var data=''
        if(source==='foursquare'){
            data = new fourSquare(responseData)
        }else if(source==='googleplace'){
            data = new googleplace(responseData)
        }else if(source ==='yelp'){
            data = new yelp(responseData)
        }else if(source === 'pexels'){
            data = new pexels(responseData)
        }
        await data.save()
    }catch(e){
        return console.log(e)
    }

}
module.exports=getJsonArray