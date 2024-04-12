<?php

use Illuminate\Support\Facades\Route;

//Resident
Route::get('/resident/{resident}', 'App\Http\Controllers\ResidentController@show')->name('resident.fetch');
Route::get('/residents', 'App\Http\Controllers\ResidentController@showAll')->name('residents.fetchAll');
Route::post('/residents', 'App\Http\Controllers\ResidentController@create')->name('residents.post');
//Route::post('/residents/{resident}', 'App\Http\Controllers\ResidentController@validateRent')->name('resident.validateRent');
Route::delete('/residents/{resident}', 'App\Http\Controllers\ResidentController@delete')->name('resident.delete');

//Rides
Route::get('/rides', 'App\Http\Controllers\RideController@showAll')->name('rides.fetchAll');
Route::post('/rides', 'App\Http\Controllers\RideController@create')->name('rides.post');
Route::delete('/rides/{ride}', 'App\Http\Controllers\RideController@delete')->name('ride.delete');

//Taxi company
Route::get('/taxiCompanies/{taxiCompany}', 'App\Http\Controllers\TaxiCompanyController@show')->name('taxiCompany.fetch');
Route::get('/taxiCompanies', 'App\Http\Controllers\TaxiCompanyController@showAll')->name('taxiCompanies.fetchAll');
Route::post('/taxiCompanies', 'App\Http\Controllers\TaxiCompanyController@create')->name('taxiCompanies.post');
Route::delete('/taxiCompanies/{taxiCompany}', 'App\Http\Controllers\TaxiCompanyController@delete')->name('taxiCompany.delete');