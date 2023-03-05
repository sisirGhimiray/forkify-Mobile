// class CssClassGiver {
//   classIDCache = [];
//   cacheLength = 0;
//   givesTimes = 0;
//   givenItems = [];

//   make(html) {
//     for (let i = this.cacheLength; i < html.length; i++) {
//       if (
//         html[i] == "c" &&
//         html[i + 1] == "l" &&
//         html[i + 2] == "a" &&
//         html[i + 3] == "s" &&
//         html[i + 4] == "s" &&
//         html[i + 5] == "="
//       ) {
//         let temp = "";
//         let j;
//         for (j = i + 7; html[j] != '"'; j++) {
//           temp += html[j];
//         }

//         if (1) {
//           let stopOrNot = false;
//           for (const i of this.givenItems.flat(1)) {
//             if (i.value === temp) {
//               stopOrNot = true;
//               break;
//             }
//           }
//           if (stopOrNot) {
//             continue;
//           }
//         }

//         this.classIDCache.push({ type: "class", value: temp });

//         i = j;
//       }

//       if (html[i] == "i" && html[i + 1] == "d" && html[i + 2] == "=") {
//         let temp = "";
//         let j;
//         for (j = i + 4; html[j] != '"'; j++) {
//           temp += html[j];
//         }

//         if (1) {
//           let stopOrNot = false;
//           for (const i of this.givenItems.flat(1)) {
//             if (i.value === temp) {
//               stopOrNot = true;
//               break;
//             }
//           }
//           if (stopOrNot) {
//             continue;
//           }
//         }

//         if (this.givenItems.includes({ type: "id", value: temp })) {
//         } else {
//           this.classIDCache.push({ type: "id", value: temp });
//         }
//         i = j;
//       }
//     }
//   }

//   process(html) {
//     this.make(html);

//     this.givenItems.push(this.classIDCache);
//     this.givesTimes += 1;
//   }

//   give(html) {
//     this.classIDCache = [];
//     this.process(html);

//     console.log(this.classIDCache);
//   }
// }

// const cssClassIdGiver = new CssClassGiver();

function sisir() {
  console.log(b);
}
