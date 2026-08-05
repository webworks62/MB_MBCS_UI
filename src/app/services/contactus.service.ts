import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ContcatusService{

  private eduUrl = 'assets/constData/education.json';
    private stateUrl = 'assets/constData/states.json';

  constructor(private http: HttpClient) {}

   private degreeCoursesSignal = signal<any[]>([]);

   private stateSignal = signal<any[]>([]);



  async loadDegreeCourses() {
    // ✅ cache check
    if (this.degreeCoursesSignal().length === 0) {
      const data = await firstValueFrom(
        this.http.get<any[]>(this.eduUrl)
      );
      this.degreeCoursesSignal.set(data);
    }
  }

  // 🔹 expose read-only data
  getDegreeCourses() {
    return this.degreeCoursesSignal;
  }

  async loadStatesData(){
    if(this.stateSignal().length === 0){
      const data = await firstValueFrom(
        this.http.get<any[]>(this.stateUrl)
      );
      this.stateSignal.set(data);
    }
  }

  getStatesData(){
    return this.stateSignal;
  }

}
