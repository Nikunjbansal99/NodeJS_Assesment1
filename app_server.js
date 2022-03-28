const stopwords = require('stopwords').english;
const nlp_operations = require("./nlp_operations");

const bodyParser = require("body-parser");
const express = require("express");



const app = express();
app.use(
	bodyParser.urlencoded({
		extended:true
	})
);

var Port  = process.env.PORT|| 8080

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

//"url('https://assesmentfiles.blob.core.windows.net/assesmentfiles/bg_cover.jpg')";

app.post("/", function(req, res) {
	var input_text = String(req.body.input_text);
        res.write("\n ------------------------------------------------------------------------------------------------------Entered Text------------------------------------------------------------------------------------ \n \n ");
	
	res.write(input_text);
	
	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n ");

	res.write("\n ---------------------------------------------------------------------------------------------------Sentence Segmentation------------------------------------------------------------------------------ \n \n ");

	var sentences = nlp_operations.sentence_segmentation(input_text);
        
	sentences.forEach((sentence) => {
		res.write(sentence.trim());
		res.write("\n");
	})


	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");

	res.write("\n -----------------------------------------------------------------------------------------------------Word Segmentation-------------------------------------------------------------------------------- \n \n ");
	
	var words = nlp_operations.word_segmentation(input_text);
	
	words.forEach((word) => {
		res.write(word);
		res.write("\t\t");
		if (word.trim() === ("." ||"?" || "!")){
			res.write("\n\n");
		}
	});

	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");

	res.write("\n ---------------------------------------------------------------------------------------------------Removing Stopwords--------------------------------------------------------------------------------- \n \n ");

	var sentences = nlp_operations.without_stopwords(input_text);
	
	sentences.forEach((sentence) => {
		res.write(sentence.trim());
		res.write("\n");
	})

	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");

	res.write("\n -------------------------------------------------------------------------------------------------Removing Repeated Words------------------------------------------------------------------------------ \n \n ");

	var sentences = nlp_operations.without_repeated(input_text);
	
	sentences.forEach((sentence) => {
		res.write(sentence.trim())
		res.write("\n");
	})
	

	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");

	res.write("\n ----------------------------------------------------------------------------------------------------Reverse Strings------------------------------------------------------------------------------------ \n \n ");

	var sentences = nlp_operations.reverse_strings(input_text);
	
	sentences.forEach((sentence) => {
		res.write(sentence.trim());
		res.write("\n");
	})

	res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");

	res.write("\n ----------------------------------------------------------------------------------------------------Extract Numbers----------------------------------------------------------------------------------- \n \n ");

	var nums = nlp_operations.extract_numbers(input_text);
        // console.log(nums);

	nums.forEach((num) => {
		//console.log(num);
		num.map(String)
		res.write("\n");
		num.forEach((n) => {
			res.write(n);
			res.write("\n")
			//console.log(n);
		});
	})
        res.write("\n ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n \n \n");
	res.end();
	}

);

app.listen(Port, function(){
  console.log("NLP Nodejs App Server is running on Port: 8080 by default");
})
