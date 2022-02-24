import axios from "axios";
import Parser from 'rss-parser';
let parser = new Parser();


const getDifference = (arr1, arr2) => {
    return arr1.filter((ele) => !arr2.some((ele1) => ele.feedTitle === ele1.feedTitle));
  }

export const dataFetch = async (url) => {
    try{
        const response = await axios.get(url);
        let data = await response.data;
        data = data.map(item => item = item.feedUrl);

        const response1 = await axios.get(`${url}details/`);
        const data1 = await response1.data;

        const feedDetails = [];
        data.forEach(async ele => {
            let feed = await parser.parseURL(ele);
            feed.items.forEach(item => {
                const feedTitle = item.title, feedAuthor = feed.title, feedDate = new Date(item.pubDate).toLocaleString(),
                feedDescription = item.content, feedUrl = ele;

                const obj = {
                    feedTitle, feedAuthor, feedDate, feedDescription, feedUrl
                };
                feedDetails.push(obj);
              });
            
              const diff1 = getDifference(data1, feedDetails);  // to be excluded
              const diff2 = getDifference(feedDetails, data1);  // to be included
              diff1.forEach(async feeditem => {
                    await axios.delete(`${url}details/${feeditem._id}`);
              });
              diff2.forEach(async feeditem => {
                  try{
                    await axios.post(`${url}details/`, feeditem);
                  }
                  catch(err){
                      console.log(err);
                  }
                
          });
              
        });
        
    }
    catch(err){
        console.log(err.message);
    }
    
}

