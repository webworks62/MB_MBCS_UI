import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-count',
  imports: [],
 template:`<div class="p-8">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">

    <div>
      <h1 class="counter text-4xl font-bold" data-count="145">0+</h1>
      <p class="text-gray-600">Students</p>
    </div>

    <div>
      <h1 class="counter text-4xl font-bold" data-count="15">0+</h1>
      <p class="text-gray-600">Courses</p>
    </div>

    <div>
      <h1 class="counter text-4xl font-bold" data-count="1.6">0</h1>
      <p class="text-gray-600">High Packages (Cr)</p>
    </div>

    <div>
      <h1 class="counter text-4xl font-bold" data-count="35">0+</h1>
      <p class="text-gray-600">Counselors</p>
    </div>

  </div>
</div>
`
})
export class Count implements AfterViewInit {

  ngAfterViewInit() {
  const counters = document.querySelectorAll('.counter');

  const speed = 200;

  const runCounter = (counter: any) => {
    const target = parseFloat(counter.getAttribute('data-count'));
    let count = 0;

    const increment = target / speed;

    const update = () => {
      count += increment;

      if (count < target) {
        counter.innerText = Math.floor(count) + "+";
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + (counter.innerText.includes("Cr") ? " Cr" : "+");
      }
    };

    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}


}
