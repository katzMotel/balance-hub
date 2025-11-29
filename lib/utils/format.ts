/**
 * Format currency values to a string with two decimal places and a dollar sign.
 */
export function formatCurrency(amount: number, showSign: boolean = false): string {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
    if(showSign && amount !== 0){
        return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return amount < 0 ? `-${formatted}` : formatted;
}

/**
 * Format Date
 * */
export function formatDate(date: string | Date): string{
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
       month: 'short',
       day: 'numeric',
       year: 'numeric',
    });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}