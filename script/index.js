const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}
loadLessons()

const removeActive =() => {
    const lessontButton = document.querySelectorAll(".lesson-btn")
    // console.log(lessontButton)
    lessontButton.forEach(btn=>btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive() // remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active") // add a active class
            // console.log(clickBtn)
            displayLevelWords(json.data)
        })
}

const displayLevelWords = (words) => {
    // 1. get the container and empty it
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
       </div>
        `
        return
    }

    // 2. get into every lesson words
    words.forEach((word) => {
        // console.log(word)
        // 3. create element
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl">${word.word?word.word:"শব্দটি নেই"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>
            <div class="font-bangla text-xl font-medium">"${word.meaning? word.meaning:'অর্থটি নেই'} / ${word.pronunciation? word.pronunciation: 'উচ্চারণটি নেই'}"</div>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        // 4. append into the container
        wordContainer.append(card);
    })
}
const displayLesson = (levels) => {
// console.log(levels)
    // 1 get the container & empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = '';
    // 2 get into every lessons
    levels.forEach(level => {
        // console.log(level)
        //   3. create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${level.level_no}" onClick="loadLevelWord(${level.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>
        Lesson - ${level.level_no}</button>
        `
        //   4. Append into container
        levelContainer.append(btnDiv);
    })


}
