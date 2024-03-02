var selectedSits = [];
var selectedSitsCount = 0;
var totalPrice = 0;
var seatPrice = 550;
var totalSeatsLeft = 40;
var coupons = ['NEW15', 'Couple 20'];
var couponDiscounts = [15, 20];

document.addEventListener('click', function (e) {

  // Select sit
  if (e.target.classList.contains('seat')) {
    SeatSelection(e);
  }

  // coupon submission
  if (e.target.classList.contains('apply-coupon')) {
    applyCoupon(e);
  };

});

document.querySelector('.booking-form button').addEventListener('click', function () {
  submitBooking();
});

function submitBooking() {
  if (selectedSits.length > 0) {
    let tel = document.querySelector('.booking-form input[name="tel"]');
    if (tel.value.length > 1) {
      document.getElementById("my_modal_3").showModal();
      setTimeout(() => { document.location.reload(); }, 4000);
    }
  }
}

function applyCoupon(e) {

  if (selectedSits.length == 4) {
    let coupon = document.querySelector('.coupon-form input').value;
    if (coupons.includes(coupon)) {
      let discount = couponDiscounts[coupons.indexOf(coupon)];
      let total = selectedSits.length * seatPrice;
      let discountedPrice = total - (total * discount / 100);
      document.querySelector(".grand-total .total").innerText = discountedPrice;
    }
  } else {
    document.querySelector('.coupon-form input').value = '';
    document.querySelector('.coupon-form input').setAttribute('disabled', 'disabled');
    document.querySelector('.coupon-form button').setAttribute('disabled', 'disabled');
  }

}

function SeatSelection(e) {
  if (e.target.classList.contains('selected')) {
    e.target.classList.remove('selected');
    selectedSits = selectedSits.filter(sit => sit !== e.target.innerText);
    totalSeatsLeft++;
  } else if (selectedSits.length < 4) {
    e.target.classList.add('selected');
    selectedSits.push(e.target.innerText);
    totalSeatsLeft--;
  }

  if (selectedSits.length <= 4) {
    seatCounters();
  }
  applyCoupon(e);
}


function seatCounters() {
  document.querySelector(".left_seat").innerText = totalSeatsLeft + " ";
  document.querySelector(".total_booked_seat").innerText = selectedSits.length;

  checkFourTicket();

  let setRow = '';

  selectedSits.forEach(sit => {
    setRow += `
    <div class="py-2 flex justify-between">
      <span class="text-slate-400">${sit}</span> 
      <span class="text-slate-400">Economy</span>
      <span class="text-slate-400">550</span>
    </div>
    `;
  });

  document.querySelector(".summary-col").innerHTML = setRow;
  document.querySelector(".subtotal").innerText = selectedSits.length * seatPrice;
  document.querySelector(".grand-total .total").innerText = selectedSits.length * seatPrice;
}

function checkFourTicket() {
  if (selectedSits.length == 4) {
    document.querySelector(".coupon-form input").removeAttribute("disabled");
    document.querySelector(".coupon-form button").removeAttribute("disabled");
  }
}
