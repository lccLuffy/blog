<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\User;
use Dingo\Api\Exception\StoreResourceFailedException;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class APIAuthController extends BaseController
{
    public function __construct()
    {
        $this->middleware('api.auth', ['only' => ['checkToken']]);
    }
    /**
     * @param Request $request
     * @return array
     *
     */
    public function register(Request $request)
    {
        $rules = [
            'username' => 'required|max:16|min:3|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ];
        $validator = $this->getValidationFactory()->make($request->all(), $rules);
        if($validator->fails())
        {
            abort(200,json_encode($validator->errors()));
        }
        $user = $this->create($request->all());
        return $this->wrapArray(['user'=>User::findOrFail($user->id),'token'=>JWTAuth::fromUser($user)]);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|Request
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                abort(200,'email or password is wrong');
            }
        } catch (JWTException $e) {
            abort(200,'email or password is wrong');
        }
        $user = JWTAuth::toUser($token);
        return $this->wrapArray(compact('user','token'));
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    public function checkToken()
    {
        return $this->wrapArray($this->user()->username.' are login');
    }
}
