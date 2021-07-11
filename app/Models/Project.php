<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function traps() {
        return $this->hasMany(Trap::class);
    }

    public function traplines() {
        return $this->hasMany(TrapLine::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }


}