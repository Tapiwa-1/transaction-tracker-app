<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

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

            $transaction = Transaction::create($request->all());

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
            $transaction = Transaction::findOrFail($id);
            $transaction->update($request->all());
    
            return response()->json($transaction);;


        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }

    public function destroy($id)
    {
        try {
            Transaction::findOrFail($id)->delete();

            return response()->json(['message' => 'Transaction deleted successfully']);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }
}
