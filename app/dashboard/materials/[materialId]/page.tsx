// "use client";

// import { useRouter } from 'next/router';
// import { useUserContext } from '@/contexts/user-context';
// import { useState, useEffect } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export default function EditMaterialPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { state, updateMaterialContent } = useUserContext();
//   const [content, setContent] = useState<any>({});

//   useEffect(() => {
//     if (id) {
//       const material = state.materials.find(material => material.id === id);
//       if (material) {
//         setContent(material.content || {});
//       }
//     }
//   }, [id, state.materials]);

//   const handleSave = () => {
//     if (id) {
//       updateMaterialContent(id as string, content);
//       router.push('/dashboard/materials');
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">Edit Material</h1>
//       {/* Add form fields for editing material content */}
//       <Input
//         value={content.heading || ''}
//         onChange={(e) => setContent({ ...content, heading: e.target.value })}
//         placeholder="Heading"
//       />
//       <Input
//         value={content.text || ''}
//         onChange={(e) => setContent({ ...content, text: e.target.value })}
//         placeholder="Text"
//       />
//       {/* Add more fields as needed */}
//       <Button onClick={handleSave}>Save</Button>
//     </div>
//   );
// }

export default function EditMaterialPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Material</h1>    
    </div>
  );
}