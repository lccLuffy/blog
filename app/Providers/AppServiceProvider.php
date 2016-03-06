<?php

namespace App\Providers;

use App\Category;
use Carbon\Carbon;
use Dingo\Api\Contract\Debug\MessageBagErrors;
use Exception;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Carbon::setLocale('zh');
        view()->composer('layouts.app', function ($view) {
            $view->with('categories', Category::all('name'));
        });

        /*app('Dingo\Api\Exception\Handler')->register(function (\Symfony\Component\HttpKernel\Exception\HttpException  $e) {
            return response()->make(
                [
                    'error' => true,
                    'message'=>$e->getMessage(),
                    'errors'=>$this->getErrors($e),
                    'status_code'=>$this->getStatusCode($e)
                ]);
        });*/

    }


    /**
     * Get the status code from the exception.
     *
     * @param \Exception $exception
     *
     * @return int
     */
    protected function getStatusCode(\Exception $exception)
    {
        return $exception instanceof HttpExceptionInterface ? $exception->getStatusCode() : 500;
    }

    protected function getErrors(\Exception $exception)
    {
        if ($exception instanceof MessageBagErrors && $exception->hasErrors()) {
            return $exception->getErrors();
        }
        return '';
    }
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

}
