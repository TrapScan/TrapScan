<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Trap;
use Illuminate\Http\Request;

class QRController extends Controller
{
    public function create(Request $request) {
        $validated_data = $request->validate([
            'number' => 'required|integer',
            'user' => 'nullable|integer'
        ]);

        $ids = [];
        for ($i = 0; $i < $validated_data['number']; $i++) {
            $qr_id = getUniqueTrapId();
            Trap::create([
                'nz_trap_id' => null,
                'trap_line_id' => null,
                'qr_id' => $qr_id,
                'project_id' => null,
                'user_id' => null
            ]);
            $ids[] = $qr_id;
        }

        return ['new_qr_codes' => $ids];
    }

    public function createInProject(Request $request, Project $project) {
        $validated_data = $request->validate([
            'number' => 'required|integer',
            'user' => 'nullable|integer'
        ]);

        $ids = [];
        for ($i = 0; $i < $validated_data['number']; $i++) {
            $qr_id = getUniqueTrapId();
            Trap::create([
                'nz_trap_id' => null,
                'trap_line_id' => null,
                'qr_id' => $qr_id,
                'project_id' => $project->id,
                'user_id' => null
            ]);
            $ids[] = $qr_id;
        }

        return ['new_qr_codes' => $ids];
    }

    public function unmapped(Request $request) {
        return Trap::unmapped()->get();
    }

    public function unmappedInProject(Project $project) {
        return Trap::where('project_id', $project->id)->unmappedInProject()->get();
    }

    public function mapQRCode(Request $request) {
        $validated_data = $request->validate([
           'nz_id' => 'required',
           'qr_code' => 'required'
        ]);

        $trap = Trap::where('qr_id', $validated_data['qr_code'])->first();
        if(! $trap){
            // Create it?
        }
        $trap->nz_id = $validated_data['nz_id'];
        $trap->save();

        return response()->json(['message' => 'Trap has been assigned a NZ trap ID']);
    }
}