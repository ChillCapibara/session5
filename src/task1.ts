// Create a function superSort that takes an array of strings and sort direction with two possible values: "asc" and "desc". The function returns a sorted array as a copy.
// Create a type alias SortFunction for this function.

type SortFunction = (arr: string[], direction: "asc" | "desc") => string[];

function superSort(arr: string[], direction: "asc" | "desc"): string[] {
  const copy = [...arr];
  return copy.sort((a, b) => {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });
}

let names = ["Vlad", "Ira", "Nina", "Alex"];
console.log(superSort(names, "asc")); 
const func: SortFunction = superSort;
const result = func(["A", "C", "D", "B"], "desc");
console.log(result); 