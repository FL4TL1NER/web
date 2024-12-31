my_form_elements = document.forms.my_form.elements;
number_indices = [0,1,2,3,4]

function bubble_sort(array) {
	for (i=0;i<array.length;i++) {
		for (j=0;j<array.length-1-i;j++) {
			if(array[j] < array[j+1]) {
				temp = array[j]
				array[j] = array[j+1]
				array[j+1] = temp
			}
		}
	}
	return array
}

function submit_handle() {
	let array_of_elements = number_indices.map((i) => Number(my_form_elements[i].value));
	document.getElementById("result").innerText = bubble_sort(array_of_elements).reduce((a,b) => a + " " + b);
	//return false не работает, нужно в html документе прописывать
}