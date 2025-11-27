'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
export default function ComponentsTest() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Button Variants</h2>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Button Sizes</h2>
        <div className="flex gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">States</h2>
        <div className="flex gap-4">
          <Button onClick={() => alert('Clicked!')}>Clickable</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
       <h2 className="text-xl font-bold mb-4">Cards</h2>
  <div className="grid grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
      </CardHeader>
      <p className="text-gray-600">This is a card with some content.</p>
    </Card>

    <Card hover>
      <CardHeader>
        <CardTitle>Hover Card</CardTitle>
      </CardHeader>
      <p className="text-gray-600">Hover over me to see the effect!</p>
    </Card>
  </div>
  <h2 className="text-xl font-bold mb-4">Input</h2>
  <div className="w-1/3 space-y-4">
    <Input label="Username" placeholder="Enter your username" />
    <Input label="Email" type="email" placeholder="Enter your email" />
    <Input label="Password" type="password" placeholder="Enter your password" />
    <Input label="With Error" placeholder="This has an error" error="Invalid input" />
  </div>

    </div>
    
  );


}