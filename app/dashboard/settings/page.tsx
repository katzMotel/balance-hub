"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme, selectTheme } from "@/store/slices/uiSlice";

export default function SettingsPage() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    return(
        <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      {/* Settings sections will go here */}
    </div>
    )
}