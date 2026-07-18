
const toggle = document.getElementById('toggleplan')
const arcadeplan = document.getElementById('arcadeplan')
const Advanceplan = document.getElementById('Advanceplan')
const proplan = document.getElementById('proplan')

const form5 = document.getElementById('form5')
const form4 = document.getElementById('form4')
const form = document.getElementById('form')
const form2 = document.getElementById('form2')
const form3 = document.getElementById('form3')
const nameinput = document.getElementById('name')
const emailInput = document.getElementById('email')
const numberinput = document.getElementById('Number')
const nameRegex = /^[a-zA-Z\s]+$/;
const mon = document.getElementById('mon')
const yrly = document.getElementById('yrly')

const btn = document.getElementById('btnNext')
const backbtn = document.getElementById("backbtn")
const back2btn = document.getElementById("back2btn")
const ntx2btn = document.getElementById('ntx2btn')
const back3btn = document.getElementById('back3btn')
const next3btn = document.getElementById('next3btn')
const next4btn = document.getElementById('next4btn')
const changebtn = document.getElementById('changebtn')

const errorname = document.getElementById('error-name')
const errormail = document.getElementById('error-email')
const errorphone = document.getElementById('error-phone')
//const bracket = document.getElementById('bra')
//const bracket2 = document.getElementById('bra2')

//let selectedplan ={}

const state = {
        plan: "arcade",
        billing: "monthly",
        addons : []
}

const prices = {
        arcade:{monthly: 9, yearly: 90,},
        advanced:{monthly: 12, yearly :120},
        pro:{monthly: 15, yearly :150},
}


const sumplanName = document.getElementById('sumplanName')
const sumplanprice = document.getElementById('sumplanprice')
const summaryaddon = document.getElementById('summaryaddon')
const subity = document.getElementById('subity')
const sumtot = document.getElementById('sumtot')


//const sumaryprice = document.getElementById('sumaryprice')
// const sumarryplan = document.getElementById ('sumarryplan')

const yearly = document.querySelectorAll('.yearly')
const pprices = document.querySelectorAll('.price')
const bonus = document.querySelectorAll('.bonus')


const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById ('step4')

const thirdstage = document.querySelectorAll('.thirdstage')
const step3mon = document.querySelectorAll('.step3mon')
const step4yrly = document.querySelectorAll('.step4yrly')
const step4mon = document.querySelectorAll('.step4mon')

const plancards = document.querySelectorAll('.plancard');
const addonsplan = document.querySelectorAll('.addonsplan')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


plancards.forEach (eno => {
        
        eno.classList.add(
           
                "p-6",
                "rounded-xl",
                "border",
                "border-gray-300",
                //"transition",
                "hover:border-purple-600",
                // "hover:bg-blue-50",
"cursor-pointer"  )

//        Remove selected state stae on all
         eno.addEventListener('click', () =>{
                state.plan=eno.dataset.plan
                plancards.forEach(eno=>{
                eno.classList.remove(
                        "border-purple-600",
                        "bg-blue-50",
                        "shadow-md"
                );
                });

            //    Add to selected or clicked one
           eno.classList.add(
        "border-purple-600",
        "bg-blue-50",
        "shadow-md"
           )
        
         })
                          
        })
           if (plancards.length>0){
        plancards[0].classList.add(
      "border-purple-600",
        "bg-blue-50",
        "shadow-md"
        )}




addonsplan.forEach(vee => {
        const checkbox = vee.querySelector('input[type="checkbox"]')
        
        vee.classList.add(
                "p-6",
                "rounded-xl",
                "border",
                "border-gray-300",
                //"transition",
                "hover:border-purple-600",
                // "hover:bg-blue-50",
                "cursor-pointer"
        );
        checkbox.addEventListener('change', () =>{
                const name = vee.dataset.addon
                if(checkbox.checked){
                        vee.classList.add("border-purple-600", "bg-blue-50", "shadow-md")
                        state.addons.push(name)
                }
                else{
                        vee.classList.remove("border-purple-600", "bg-blue-50", "shadow-md")
                        state.addons = state.addons.filter(a=>a!==name)
                }
        })
       

})




function renderSummary (){
 let addonTotal = 0

        const planName = state.plan 
        const plandisplayname = planName.charAt(0).toUpperCase()+ planName.slice(1)
        sumplanName.textContent = plandisplayname

       const planprice = prices[state.plan][state.billing]
       let planpricetext 
       if (state.billing==="monthly"){
        planpricetext =`$${planprice}/mo`
       }
       else {
        planpricetext = `$${planprice}/yr`
       }
       sumplanprice.textContent = planpricetext

       let billingtext 
       if (state.billing === "monthly"){
        billingtext = "month"
       }
       else {
        billingtext ="year"
       }
       subity.textContent= billingtext

    summaryaddon.innerHTML =""

  state.addons.forEach(function (addon){
        let eno = document.querySelector(`[data-addon="${addon}"]`)

        let addonprice 
        if(state.billing==="monthly"){
                addonprice = Number(eno.dataset.priceMonthly)
        } else{
                addonprice = Number(eno.dataset.priceYearly)
        }

         addonTotal = addonTotal +  addonprice

        const addonslist = document.createElement("li")
        addonslist.classList.add("flex", "justify-between")
        addonslist.innerHTML = `<span>${addon}</span><span>+$${addonprice}</span>`

        summaryaddon.appendChild(addonslist) 
  })


  const total = planprice + addonTotal
  if (state.billing === "monthly"){
     sumtot.textContent = `$${total}/mo`
  } else {
     sumtot.textContent = `$${total}/yr`
  }
}



btn.addEventListener("click", function (event) {
let isValid = true 
event.preventDefault()
if (nameinput.value.trim()===""){
        errorname.style.display="block"
        errorname.textContent="This field is required"
        errorname.style.color = "red"
       isValid = false
    console.log("name is required");
}
else {
        errorname.style.display="none"
}


if (emailInput.value.trim() === ""){
    errormail.style.display="block"
    errormail.textContent="This field is required"
    errormail.style.color = "red"
    isValid = false
}
else if (!emailRegex.test(emailInput.value.trim())){
    errormail.style.display="block"
    errormail.textContent="Please enter a valid email address"
    errormail.style.color = "red"
    isValid = false
}
else {
    errormail.style.display = "none"
}

const phoneValue = numberinput.value.trim()

if (phoneValue === ""){
        errorphone.style.display="block"
        errorphone.textContent="This field is required"
        errorphone.style.color = "red"
        isValid = false
}
else if (phoneValue.length < 5){
        errorphone.style.display="block"
        errorphone.textContent="Phone number must be at least 5 digits"
        errorphone.style.color = "red"
        isValid = false
}
else {
        errorphone.style.display= "none"
}

if(!isValid) return

if (isValid){
        console.log("form summited");
        
        form.classList.add("hidden")
        form2.classList.remove("hidden")
}

step1.classList.remove("bg-[hsl(228,100%,84%)]");
step1.classList.add("border", "border-white", "text-white");

step2.classList.add("bg-[hsl(228,100%,84%)]")
step2.classList.remove("border", "border-white");

})


toggle.addEventListener("change", () => {
if (toggle.checked){
        state.billing = "yearly"
        yearly.forEach(el => el.classList.remove("hidden"))
        bonus.forEach(el => el.classList.remove("hidden"))
        pprices.forEach(el=> el.classList.add("hidden"))
        yrly.style.color = "hsl(213, 96%, 18%)"
        yrly.style.textTransform = "bold"
        mon.style.color = "hsl(231,11%,63%)"
     thirdstage.forEach(el=>el.classList.remove('hidden'))
     step3mon.forEach(el=>el.classList.add("hidden"))
     step4yrly.forEach(el=>el.classList.remove("hidden"))
     step4mon.forEach(el=>el.classList.add("hidden"))
    // bracket.style.display = "block"
   //  bracket2.style.display = "hidden"
        
}
else {
        state.billing = "monthly"
        yearly.forEach(el=>el.classList.add("hidden"))
        bonus.forEach(el=>el.classList.add("hidden"))
        pprices.forEach(el => el.classList.remove("hidden"))
       yrly.style.color = "hsl(231,11%,63%)"
       mon.style.color = "hsl(213, 96%, 18%)"
 thirdstage.forEach(el=>el.classList.add('hidden'))
     step3mon.forEach(el=>el.classList.remove("hidden"))
     step4yrly.forEach(el=>el.classList.add("hidden"))
     step4mon.forEach(el=>el.classList.remove("hidden"))
      //bracket.style.display = "hidden"
     //bracket2.style.display = "block"

}
}
  

)
backbtn.addEventListener("click",()=>{
        form.classList.remove("hidden")
        form2.classList.add("hidden")

        step1.classList.add("bg-[hsl(228,100%,84%)]")
        step1.classList.remove("border", "border-white", "text-white")
        step2.classList.remove("bg-[hsl(228,100%,84%)]")
        step2.classList.add("border", "border-white");
})

ntx2btn.addEventListener("click",()=>{
        form3.classList.remove("hidden")
        form2.classList.add("hidden")
        step2.classList.remove("bg-[hsl(228,100%,84%)]");
        step2.classList.add("border", "border-white", "text-white");
        
        step3.classList.add("bg-[hsl(228,100%,84%)]")
        step3.classList.remove("border", "border-white");


})

back2btn.addEventListener("click",()=>{
        form2.classList.remove("hidden")
        form3.classList.add("hidden")

        step2.classList.add("bg-[hsl(228,100%,84%)]")
        step2.classList.remove("border", "border-white",)
        step3.classList.remove("bg-[hsl(228,100%,84%)]")
        step3.classList.add("border", "border-white");
})

back3btn.addEventListener("click",()=>{
        form3.classList.remove("hidden")
        form4.classList.add("hidden")

        step3.classList.add("bg-[hsl(228,100%,84%)]")
        step3.classList.remove("border", "border-white",)
        step4.classList.remove("bg-[hsl(228,100%,84%)]")
        step4.classList.add("border", "border-white");
})

next3btn.addEventListener("click", ()=> {
        form4.classList.remove("hidden")
        form3.classList.add("hidden")
     renderSummary()


       step3.classList.remove("bg-[hsl(228,100%,84%)]");
        step3.classList.add("border", "border-white", "text-white");
        
        step4.classList.add("bg-[hsl(228,100%,84%)]")
        step4.classList.remove("border", "border-white");

})

next4btn.addEventListener("click",()=> {
         form5.classList.remove("hidden")
        form4.classList.add("hidden")


})
changebtn.addEventListener("click", () => {
     form2.classList.remove("hidden")
     form4.classList.add("hidden")
     
step4.classList.remove("bg-[hsl(228,100%,84%)]")
step4.classList.add("border", "border-white");
 step2.classList.add("bg-[hsl(228,100%,84%)]")
step2.classList.remove("border", "border-white",)


})









