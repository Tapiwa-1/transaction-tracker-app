<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $transactions = Transaction::query();

            if ($request->has('search')) {
                $transactions->where('description', 'like', '%' . $request->search . '%');
            }

            if ($request->has('sort')) {
                $transactions->orderBy('date', $request->sort);
            }

            return response()->json($transactions->get());

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'date' => 'required|date',
                'amount' => 'required|numeric',
                'description' => 'required|string',
            ]);

            $transaction = DB::transaction(function () use ($request) {
                return Transaction::create($request->all());
            });

            return response()->json($transaction, 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show($id)
    {
        try {
            return response()->json(Transaction::findOrFail($id));

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $transaction = DB::transaction(function () use ($request, $id) {
                $transaction = Transaction::findOrFail($id);
                $transaction->update($request->all());
                return $transaction;
            });

            return response()->json($transaction);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy($id)
    {
        try {
            DB::transaction(function () use ($id) {
                $transaction = Transaction::findOrFail($id);
                $transaction->delete();
            });

            return response()->json(['message' => 'Transaction deleted successfully']);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
