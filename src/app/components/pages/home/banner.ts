import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
template:`

<!-- <div class="hidden md:block md:mt-3 mx-3">
  <img
    src=""
    alt="banner"
    class="w-full rounded-2xl object-cover"
  />
</div> -->

<div class="mx-4 my-6">
  <img
    src="assets/banner/banner.jpg"
    alt="Fashion Banner"
    class="w-full h-[120px] sm:h-[220px] md:h-[280px] lg:h-[380px] rounded-2xl object-fit shadow-lg"
  />
</div>

`
})
export class Banner {

}
