<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($request->device_name)->plainTextToken;

            return response()->json(['token' => $token], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken($request->device_name)->plainTextToken;

            return response()->json(['token' => $token,'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }


    }

    public function logout()
    {
        try {
            Auth::user()->tokens()->delete();
            return response()->json(['message' => 'Logged out successfully']);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
