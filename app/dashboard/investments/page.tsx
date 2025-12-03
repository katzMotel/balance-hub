"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchInvestments, selectAllInvestments, selectPortfolioSummary } from "@/store/slices/investmentsSlice";       
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Investment } from "@/types/types.index";

export default function InvestmentsPage() {
    const dispatch = useAppDispatch();
    const investments = useAppSelector(selectAllInvestments);


    useEffect(()=>{
        dispatch(fetchInvestments());
    },[dispatch]);

    return(

    );
}