<?php

namespace App\Http\Controllers\API;

use App\User;
use Dingo\Api\Exception\StoreResourceFailedException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class APIAuthController extends Controller
{
    use Helpers;
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
            'password' => 'required|confirmed|min:6',
        ];
        $validator = $this->getValidationFactory()->make($request->all(), $rules);
        if($validator->fails())
        {
            throw new StoreResourceFailedException('Could not create new user.', $validator->errors());
        }
        $user = $this->create($request->all());
        return ['success'=>true,'user'=>User::findOrFail($user->id),'token'=>JWTAuth::fromUser($user)];
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
                return $this->response->errorUnauthorized();
            }
        } catch (JWTException $e) {
            return $this->response->errorUnauthorized($e->getMessage());
        }
        $user = JWTAuth::toUser($token);
        return compact('user','token');
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
}
