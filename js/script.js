let bars = [];
const def = "#fd0081", chng = "#431f91", finished = "#8ef511", selected = "yellow";

window.onload = setup();
async function setup() {
	let b = document.getElementById("bars");
	let d = document.getElementById("delay");
	document.getElementById("b").innerText = b.value;
	document.getElementById("d").innerText = d.value + "ms";

	if (bars.length != parseInt(b.value)) {
		generateBars(parseInt(b.value));
	}
}


function reset() {
	location.reload();
}


function Disable_The_Input() {
	let x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}


function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for (let i = 0; i < x.length; i++)
		x[i].style.backgroundColor = finished;
	x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = false;

}


function generateBars(n = -1) {
	bars = [];
	let container = document.getElementById("container");
	n = n < 0 ? Math.random() * 20 : n;
	for (let i = 0; i < n; i++) {
		bars.push('<div class="bar" id="' + i + '" style="height:' + Math.floor(2 + Math.random() * 98) + '%"></div>');
	}
	container.innerHTML = bars.join('');
}


function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function MapRange(value, in_min, in_max, out_min, out_max) {
	return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
//=============================== Sorting Algorithms ==================================//


// 1
// SELECTION SORT

async function SelectionSort() {
	let delay = Disable_The_Input();

	let container = document.getElementById("container");
	let working=document.querySelector(".working")
	working.innerHTML="	<ol><li><b>Initial Array: </b>[5, 2, 9, 1, 5, 6]</li><li><b>Step 1:</b> Find the minimum element in the array.<ul><li>Iterate through the array to find the minimum element (1 in this case).</li></ul></li><li><b>Swap:</b> Swap the minimum element with the first unsorted element.<ul><li>Swap arr[0] (5) with arr[min_index] (1).</li><li>New array: [1, 2, 9, 5, 5, 6]</li></ul></li><li><b>Step 2: </b>Move to the next unsorted element (excluding the sorted part).<ul><li>Consider the sub-array [2, 9, 5, 5, 6].</li></ul></li><li><b>Find Minimum:</b> Find the minimum element in the sub-array.<ul><li>Minimum element is 2.</li></ul></li><li><b>Swap:</b> Swap the minimum element with the first unsorted element.<ul><li>Swap arr[1] (2) with arr[min_index] (2 itself, in this case, no change).</li><li>Array remains: [1, 2, 9, 5, 5, 6]</li></ul></li><li><b>Step 3:</b> Move to the next unsorted element.<ul><li>Consider the sub-array [9, 5, 5, 6].</li></ul></li><li><b>Minimum:</b> Find the minimum element in the sub-array.<ul><li>Minimum element is 5.</li></ul></li><li><b>Swap:</b> Swap the minimum element with the first unsorted element.<ul><li>Swap arr[2] (9) with arr[min_index] (5).</li><li>New array: [1, 2, 5, 9, 5, 6]</ul></li><li><b>Repeat:</b> Continue this process for the remaining unsorted elements.</li><li><b>Final Result:</b> After completing the iterations, the array becomes sorted.<ul><li>Sorted array: [1, 2, 5, 5, 6, 9]</li></ul></li></ol>" 
	for (let i = 0; i < bars.length; i++) {
		let mn_ind = i;
		let curr_id = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, delay)
		for (let j = i + 1; j < bars.length; j++) {
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			let a = parseInt(bars[mn_ind].split(/[:%]/)[1]);
			let b = parseInt(bars[j].split(/[:%]/)[1]);
			if (a > b) mn_ind = j;
			await Sleep(delay / 5.0);
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}

		let nxt_ele = bars[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = selected;
		await Sleep(2 * delay / 5.0);

		let tmp = bars[mn_ind];
		bars[mn_ind] = bars[i];
		bars[i] = tmp;

		container.innerHTML = bars.join('');
		await Sleep(2 * delay / 5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}






// 2
// BUBBLE SORT

// BubbleSort() : Implementation of bubble sort algorithm. O(n^2)
async function BubbleSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");
    let working=document.querySelector(".working")
	working.innerHTML="<ol>	<li><b>Initial Array:</b>[5, 2, 9, 1, 5, 6]</li>	<li><b>Iteration 1: </b>Compare adjacent elements and swap if necessary.<ul><li>Compare arr[0] and arr[1] (5 and 2). Since 5 > 2, swap them.</li><li>New array: [2, 5, 9, 1, 5, 6]</li><li>Repeat this process for all adjacent elements in the array.</li></ul></li>	<li><b>Iteration 2: </b>Continue comparing and swapping elements.<ul><li>Compare arr[1] and arr[2] (5 and 9). No swap needed.</li><li>Compare arr[2] and arr[3] (9 and 1). Swap them since 9 > 1.</li><li>New array: [2, 5, 1, 9, 5, 6]</li><li>Continue this process until the end of the array.</li></ul></li><li><b>Iteration 3: </b>Further comparisons and swaps.<ul><li>Compare arr[3] and arr[4] (9 and 5). Swap them.</li><li>Compare arr[4] and arr[5] (9 and 6). Swap them.	</li><li>New array: [2, 5, 1, 5, 6, 9]</li></ul></li><li><b>Iteration 4: </b>Repeat until no more swaps are needed.		<ul><li>Compare elements and perform necessary swaps (if any).</li></ul></li><li><b>Final Result: </b>After several iterations, the array becomes sorted.<ul><li>After several iterations, the array becomes sorted.</li></ul></li></ol>"
	for (let i = 0; i < bars.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < bars.length - i - 1; j++) {
			let curr_id = bars[j].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(curr_id).style.backgroundColor = selected;
			let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
			beep(100, sound, delay)
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2);
			let a = parseInt(bars[j].split(/[:%]/)[1]);
			let b = parseInt(bars[j + 1].split(/[:%]/)[1]);
			if (a > b) {
				has_swap = true;

				let t = bars[j];
				bars[j] = bars[j + 1];
				bars[j + 1] = t;

				container.innerHTML = bars.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2.0);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap == false) break;
	}
	Finished_Sorting();
}





// 3
// INSERTION SORT

// InsertionSort() : Implementation of inserion sort algorithm. O(n^2) 
async function InsertionSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");
	let working=document.querySelector(".working")
   working.innerHTML="	<ol>   <li><b>Initial Array:</b>[5, 2, 9, 1, 5, 6]</li>   <li><b>Step 1:</b>Start with the second element (index 1) and consider it as the key.	   <ul>		   <li>In this case, start with arr[1] (2) as the key.		   </li>	   </ul>   </li>   <li><b>Insertion:</b>Compare the key with the elements to its left in the sorted part of the array and insert it	   in the correct position.	   <ul>		   <li>Compare 2 with 5. Since 2 < 5, swap them. </li>		   <li>Updated array: [2, 5, 9, 1, 5, 6]		   </li>	   </ul>   </li>   <li><b>Step 2: </b>Move to the next unsorted element (index 2) and consider it as the key.<ul>		   <li>Now, the key is arr[2] (9).</li>	   </ul>   </li>   <li><b>Insertion:</b>Compare the key with the elements to its left in the sorted part of the array and insert it	   in the correct position.	   <ul>		   <li>9 is greater than 5, so no change is needed.		   </li>		   <li>Array remains: [2, 5, 9, 1, 5, 6]		   </li>	   </ul>   </li>   <li><b>Step 3:</b>Move to the next unsorted element (index 3) and consider it as the key.   <ul><li>Now, the key is arr[3] (1).   </li></ul></li>   <li><b>Insertion: </b>Compare the key with the elements to its left in the sorted part of the array and insert it in the correct position.   <ul><li>Move 1 to its correct position by comparing it with elements to its left.</li><li>Updated array: [1, 2, 5, 9, 5, 6]   </li></ul></li>   <li><b>Repeat:</b>Continue this process for the remaining unsorted elements.   </li>   <li><b>Final Result: </b>After completing the iterations, the array becomes sorted.<ul><li>Sorted array: [1, 2, 5, 5, 6, 9]</li></ul>		</li></ol>"
	for (let i = 1; i < bars.length; i++) {
		let j = i - 1;
		let key = bars[i];
		let curr_id = key.split('id="')[1].split('"')[0];
		let nxt_ele = bars[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, delay)
		while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
			document.getElementById(nxt_ele).style.backgroundColor = def;
			nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay);
			bars[j + 1] = bars[j];
			j--;
		}

		bars[j + 1] = key;
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}



// 4
// MERGE SORT
// Slide_down() : Places bars[r] at lth position by sliding other bars to the right. 
function Slide_down(l, r) {
	let temp = bars[r];
	for (let i = r - 1; i >= l; i--) {
		bars[i + 1] = bars[i];
	}
	bars[l] = temp;
}


async function merge(l, m, r, d) {
	
	
	let y = l;
	let i = l;
	let j = m + 1;

	while (i < j && j <= r) {
		let curr_id = bars[j].split('id="')[1].split('"')[0];
		let nxt_ele = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[i].split(/[:%]/)[1]);

		if (a > b) i++;
		else {
			Slide_down(i, j);
			i++; j++;
		}
		await Sleep(d / 2.0);
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, d)
		await Sleep(d / 2.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
		sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, d)
	}
}


async function mergeSort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await mergeSort(l, m, d);
		await mergeSort(m + 1, r, d);
		await merge(l, m, r, d);
	}
	
}


async function MergeSort() {
	let working=document.querySelector(".working")
    working.innerHTML="<OL>	<li><b>Initial Array:</b> [5, 2, 9, 1, 5, 6]</li>	<li><b>Step 1 - Divide:</b> Split the array into smaller sub-arrays recursively until each sub-array has only one element.<ul type='disc'>	<li>Divide the array into halves until individual elements are reached.</li><li>Divide [5, 2, 9, 1, 5, 6] into [5, 2, 9], [1, 5, 6].</li></ul></li>	<li><b>Step 2 - Sort and Merge:</b>	<ul type='disc'><li>Sort each divided sub-array.<ul type='disc'><li>[5, 2, 9] becomes [2, 5, 9].</li><li>[1, 5, 6] remains [1, 5, 6].</li></ul></li></ul></li><li><b>Step 3 - Merge:</b><ul type='disc'><li>Merge the sorted sub-arrays back together into a single sorted array.<ul type='disc'><li>Merge [2, 5, 9] and [1, 5, 6] into a single sorted array.</li></ul></li><li>Comparison and Merging Process:<ul type='disc'><LI>Compare the first elements of both sub-arrays: 2 and 1. Select the smaller element (1) and place it in a new array.</LI><li>Next, compare 2 and 5, select 2, and continue.</li>	<li>Then, compare 5 and 5, select any one (let's take 5 from the left), and move forward.Compare 9 and 6, select 6.</li></ul></li></ul>	</li>	<li><b>Final Result:</b> After merging the sub-arrays back together, the array becomes sorted.<ul><li>Sorted array: [1, 2, 5, 5, 6, 9]</li></ul></li></OL>"
	let delay = Disable_The_Input();
	await mergeSort(0, bars.length - 1, delay);
	
	Finished_Sorting();
}




// 5
// QUICK SORT
// Partition(): Places the (r)th bar at the correct position 
async function Partition(l, r, d) {
	let i = l - 1;
	let j = l;
	let id = bars[r].split('id="')[1].split('"')[0];
	document.getElementById(id).style.backgroundColor = selected;
	for (j = l; j < r; j++) {
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[r].split(/[:%]/)[1]);
		if (a < b) {
			i++;
			let curr_id = bars[i].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;

			let temp = bars[i];
			bars[i] = bars[j];
			bars[j] = temp;

			await Sleep(d / 3.0);
			container.innerHTML = bars.join('');
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			document.getElementById(id).style.backgroundColor = selected;
			let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
			beep(100, sound, d)
			await Sleep(d / 3.0)
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
	}

	let temp = bars[i + 1];
	bars[i + 1] = bars[r];
	bars[r] = temp;

	container.innerHTML = bars.join(' ');
	document.getElementById(id).style.backgroundColor = selected;
	await Sleep(d / 3.0);
	document.getElementById(id).style.backgroundColor = def;
	return i + 1;
}


async function quickSort(l, r, d) {
	if (l < r) {
		let p = await Partition(l, r, d);
		await quickSort(l, p - 1, d);
		await quickSort(p + 1, r, d);
	}
}


async function QuickSort() {
	let working = document.querySelector(".working")
	working.innerHTML="<ol><li><b>Initial Array:</b>[5, 2, 9, 1, 5, 6]</li>	<li><b>Step 1 - Choose Pivot:</b>Select a pivot element from the array (various strategies can be used for selecting a pivot; for simplicity, let's choose the last element).<ul type='disc'>	<li>Choose arr[5] (6) as the pivot.</li></ul></li><li>Step 2 - Partitioning:<ul type='disc'><li>Rearrange the array elements in such a way that elements less than the pivot are on the left side,and elements greater than the pivot are on the right side.</li><li>Partition the array [5, 2, 9, 1, 5, 6] based on the pivot 6.</li><li>After partitioning: [5, 2, 1, 5, 6, 9]</li></ul></li><li><b>Step 3 - Recursion:</b><ul type='disc'><li>Recursively apply Quick Sort to the two partitions created in the previous step (left and right of the pivot) until the entire array is sorted.</li></ul>	</li><li><b>Recursion on Left Partition (elements less than pivot):</b>[5, 2, 1, 5]		<ul type='disc'><li>Choose a pivot, let's take the last element, arr[3] (5).</li>	<li>Partition [5, 2, 1, 5] based on the pivot 5.</li><li>After partitioning: [1, 2, 5, 5] (Left partition sorted).</li>	</ul></li><li><b>Recursion on Right Partition (elements greater than pivot):</b>[6, 9]<ul type='disc'><li>Since this partition has only two elements, it is already sorted.</li></ul></li><li><b>Combine Results:</b><ul><li>Merge the sorted partitions together.</li><li>[1, 2, 5, 5] (Left) + [6, 9] (Right) form the sorted array.</li></ul></li><li><b>Final Result:</b>After combining the results, the entire array becomes sorted.<ul><li>Sorted array: [1, 2, 5, 5, 6, 9]</li></ul></li></ol>"
	let delay = Disable_The_Input();
	await quickSort(0, bars.length - 1, delay);
	Finished_Sorting();
}

