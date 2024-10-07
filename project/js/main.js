const loadPhones = async (searchArg) =>{
   let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchArg}`)
   let data = await response.json()
   let phones = data.data
   displayPhones(phones)
}

const displayData = (dataArg)=>{
   let phoneContainer = document.getElementById('phone_container')
   let alertMsg = document.getElementById('alert_msg')
   phoneContainer.textContent = ''
   
   if (dataArg.length === 0) {
      alertMsg.classList.remove('hidden')
      alertMsg.innerHTML = `
         <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No result found.</span>
         </div>
      `
   }
   else {
      alertMsg.classList.add('hidden')
   }
   
   dataArg.forEach(i => {
      let card = document.createElement('div')
      card.classList = 'card bg-base-100 shadow-xl bg-white pt-5 text-slate-600'
      card.innerHTML = `
         <figure>
               <img src=${i.image} />
         </figure>
         <div class="card-body">
            <h2 class="card-title">${i.phone_name}</h2>
            <p>${i.slug}</p>
            <div class="card-actions justify-end">
               <button onclick='showDetails("${i.slug}"); show_details_modal.showModal()' class="btn btn-success text-white">Show details</button>
            </div>
         </div>
      `
      
      phoneContainer.appendChild(card)
   })
   toggleLoading(false)
}

const searchPhones = () =>{
   toggleLoading(true)
   let inputField = document.getElementById('input_field')
   let inputValue = inputField.value
   inputField.value = ''
   loadPhones(inputValue)
}

const displayPhones = (phonesArg)=>{
   let phoneContainer = document.getElementById('phone_container')
   let showBtnContainer = document.getElementById('showBtn_container')
   
   if (phonesArg.length > 6) {
      showBtnContainer.classList.remove('hidden')
   } else {
      showBtnContainer.classList.add('hidden')
   }

   displayData(phonesArg.slice(0, 6))
   
   document.getElementById('show_btn').addEventListener("click", ()=>{
      phoneContainer.textContent = '' 
      displayData(phonesArg)
      
      showBtnContainer.classList.add('hidden')
   })
   
}

const toggleLoading = (isloading) =>{
   let loading = document.getElementById('loading')
   let loadingMsg = document.getElementById('loading_msg')
   if (isloading) {
      loadingMsg.innerHTML = 'Please check your internet connection'
      loading.classList.remove('hidden')
      
   } else {
      loading.classList.add('hidden')
   }

}

const showDetails = async (id)=>{
   let response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   let data = await response.json()
   let phone = data.data
   phoneDetails(phone)
}

const phoneDetails = (detailsArg) =>{
   let detailsContainer = document.getElementById('details_container')
   detailsContainer.innerHTML = `
      <div class="w-full bg-white flex justify-center mb-5 py-3">
         <img src='${detailsArg.image}' alt="" />
      </div>
      
      <div class="">
         <h1 class='font-bold text-white text-xl'> ${detailsArg.name} </h3>
         <p class='font-normal text-md my-5'> ${detailsArg.slug} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>Storage : </span> ${detailsArg.mainFeatures.storage} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>Display size : </span> ${detailsArg.mainFeatures.displaySize} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>Memory : </span> ${detailsArg.mainFeatures.memory} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>Release Data : </span> ${detailsArg.releaseDate} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>Brand : </span> ${detailsArg.brand} </p>
         <p class='font-normal text-md my-2'><span class='font-bold text-slate-300'>GPS : </span> ${detailsArg.others.GPS} </p>
      </div>
      
   `
   show_details_modal.showModal()
}