const stopwords = require('stopwords').english

//var input_text = "Raw Text 1.Nature is made of everything we see around us– trees,flowers,plants,animals,sky,mountains,forests and more trees.Raw Text 2.Human + beings depend on nature to stay alive. Nature helps us breathe,gives us food,water,shelter,medicines35,and clothes4.Really Amazing!Why do birds sing?"
console.log("Input Text: ");
//console.log(input_text);


function sentence_segmentation(input_text){
    if (input_text==null) {
		return null
    }
    //console.log(input_text);
    //var sentences = input_text.split(/[.!?]+/);
    var sentences = input_text.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);
    var sentences = sentences.filter((sentence) => (sentence !== (undefined || '' || null)));
	//console.log(sentences);
    return sentences
}


function word_segmentation(input_text){
   if (input_text==null) {
		return null
    }
	var words = input_text.split(/([.?!;:,\s])+/);
	//var words = words.filter((word) => (word !== ' '));
	var words = words.filter((word) => (word !== (undefined || '' || null || ' ')));
	//console.log(words);
    return words
}


function without_stopwords(input_text){
	if (input_text==null) {
		return null
	}
	var words = word_segmentation(input_text);
    	var words = words.filter((word) => (!stopwords.includes(word)));

    //console.log(words)
	var text_without_stopwords = words.join(' ')
	//console.log(text_without_stopwords);
	
	var sentences = sentence_segmentation(text_without_stopwords);
	//console.log(sentences)

    return sentences
}


function without_repeated(input_text){
    if (input_text==null) {
		return null
    }
    lowercase_text = input_text.toLowerCase();
    var sentences = sentence_segmentation(lowercase_text);

	var unique_sentences = [];
	sentences.forEach((sentence) => {
		var words = word_segmentation(sentence);

		// Create a Set
		const unique_words = new Set(words);
		
		//console.log(Array.from(unique_words).join(" "));
		unique_sentences.push(Array.from(unique_words).join(" "));
	});
	return unique_sentences
}


function reverse_strings(input_text) {
    if (input_text==null) {
		return null
    }
    var sentences = sentence_segmentation(input_text);
	
	var reverse_sentences = [];
	sentences.forEach((sentence) => {
		var words = word_segmentation(sentence);
		sentence = words.map(word => word.split("").reverse().join("")).join(" ");
		
		//console.log(sentence)
		reverse_sentences.push(sentence);
	});
	//console.log(reverse_sentences)
	return reverse_sentences
}



function extract_numbers(input_text){
    if (input_text==null) {
		return null
    }	
    var sentences = sentence_segmentation(input_text);
	
	var extracted_nums = [];
	sentences.forEach((sentence) => {
		var words = word_segmentation(sentence);
		var nums = [];
		words.forEach((word) => {
			var matches = word.match(/(\d+)/);
			if (matches){
				nums.push(matches[0]);
			}
		});
		//console.log(nums)
		extracted_nums.push(nums);
	});
	return extracted_nums
}

module.exports = {
    sentence_segmentation : sentence_segmentation,
    word_segmentation : word_segmentation,
    without_stopwords : without_stopwords,
    without_repeated : without_repeated,
    reverse_strings : reverse_strings,
    extract_numbers : extract_numbers
}
console.log("Sentence Segmentation: ");
//console.log(sentence_segmentation(input_text))
console.log("Word Segmentation: ");
//console.log(word_segmentation(input_text))
console.log("Removing Stopwords: ");
//console.log(without_stopwords(input_text))
console.log("Removing Repeated words: ");
//console.log(without_repeated(input_text))
console.log("Reverse Strings: ");
//console.log(reverse_strings(input_text))
console.log("Extract Numbers: ");
//console.log(extract_numbers(input_text))
