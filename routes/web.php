<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('CallCenter', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

Route::get('/taxi-companies', function () {
    return Inertia::render('TaxiCompanies');
})->name('taxiCompaniesPage');

Route::get('/taxi-companies/{taxiCompany}', function () {
    return Inertia::render('TaxiCompany');
})->name('taxiCompanyPage');

Route::get('/residents-page/{resident}', function () {
    return Inertia::render('Resident');
})->name('residentPage');


// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

//require __DIR__.'/auth.php';
