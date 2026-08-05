import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-adminlogin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  @if (!isAdmin) {
    <section class="h-screen flex items-center justify-center bg-gray-100">
      <section class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-8">
          Admin Login
        </h1>

        <form class="flex flex-col gap-5" (ngSubmit)="onSave()">

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Username"
              [(ngModel)]="username"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              [(ngModel)]="password"
            />
          </div>

          <button
            type="submit"
            class="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>
      </section>
    </section>}
  `
})
export class AdminLogin   implements OnInit {

    isAdmin: boolean = false;


    ngOnInit(): void {
        localStorage.getItem("isAdmin") === "true" ? this.router.navigate(["/admin-dashboard"]) : this.isAdmin = false;
        console.log(this.isAdmin);
    }


  username: string = "";
  password: string = "";

  private readonly adminUsername = "Admin";
  private readonly adminPassword = "Mahesh@87905";

  constructor(private router: Router) {
  }

  onSave() {
    if (
      this.username === this.adminUsername &&
      this.password === this.adminPassword
    ) {
      localStorage.setItem("isAdmin", "true");

        this.router.navigate(["/admin-dashboard"]);
    } else {
      alert("Invalid username or password.");
    }
  }
}