<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Examination;

class ExaminationObserver
{
    /**
     * Handle the Examination "created" event.
     */
    public function created(Examination $examination): void
    {
        ActivityLog::create([
            'user_id' => auth()->user_id,
            'action' => 'CREATE',
            'model_type' => 'Examination',
            'model_id' => $examination->id,
            'after' => $examination->toJson(),
        ]);
    }

    public function updated(Examination $examination): void
    {
        ActivityLog::create([
            'user_id' => auth()->user_id,
            'action' => 'UPDATE',
            'model_type' => 'Examination',
            'model_id' => $examination->id,
            'before' => json_encode($examination->getOriginal()),
            'after' => $examination->toJson(),
        ]);
    }

    /**
     * Handle the Examination "deleted" event.
     */
    public function deleted(Examination $examination): void
    {
        //
    }

    /**
     * Handle the Examination "restored" event.
     */
    public function restored(Examination $examination): void
    {
        //
    }

    /**
     * Handle the Examination "force deleted" event.
     */
    public function forceDeleted(Examination $examination): void
    {
        //
    }
}
