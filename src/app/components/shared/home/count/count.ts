import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-count',
  imports: [],
  templateUrl: './count.html',
  styleUrl: './count.css',
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
